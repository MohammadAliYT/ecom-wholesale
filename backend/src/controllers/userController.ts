import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/db";
import { UserRegisterSchema } from "../schema/user_schema";
import { generateToken } from "../utils/jwt";
import { STATUS_CODES } from "http";

interface AuthRequest extends Request {
  user?: { id: number; role_id: number };
}

export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = UserRegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }

    const { name, email, password, role_id } = parsed.data;

    //Only allow role_id 2 (vendor) or 3 (customer)
    if (![2, 3].includes(role_id)) {
      return res.status(400).json({
        message: "Invalid role. Only 'vendor' or 'customer' roles are allowed.",
      });
    }

    //Check if user already exists
    const userExists = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    if (userExists.rowCount && userExists.rowCount > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    //Hash password securely
    const hashedPassword = await bcrypt.hash(password, 12);

    //Double-check role exists in DB
    // const roleResult = await pool.query(`SELECT id FROM roles WHERE id = $1`, [
    //   role_id,
    // ]);
    // if (roleResult.rowCount === 0) {
    //   return res.status(400).json({ message: "Invalid role ID." });
    // }

    //Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role_id, created_at`,
      [name, email, hashedPassword, role_id]
    );

    res.status(201).json({
      statusCode: 201,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err: any) {
    console.error("Error in signup:", err.message);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    const userResult = await pool.query(
      `SELECT id, email, password, role_id FROM users WHERE email = $1`,
      [email]
    );

    if (!userResult.rowCount) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({ userId: user.id, roleId: user.role_id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      domain: "localhost",
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Logged in successfully",
      // token,
      user: {
        id: user.id,
        email: user.email,
        roleId: user.role_id,
      },
    });
  } catch (err: any) {
    console.error("Error in login:", err.message);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const viewUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query(
      `SELECT id, name, email, role_id, created_at FROM users ORDER BY id ASC`
    );

    res.json({ users: users.rows });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const userResult = await pool.query(
      `SELECT id, name, email, role_id, created_at FROM users WHERE id = $1`,
      [id]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      user: userResult.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// PATCH /api/users/:id
export const updateUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, email, password, role_id } = req.body;

  try {
    // Check if user exists
    const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    if (userResult.rowCount === 0) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }

    // Hash password if provided
    let hashedPassword = userResult.rows[0].password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user
    const updated = await pool.query(
      `UPDATE users SET name = COALESCE($1, name),
                        email = COALESCE($2, email),
                        password = $3,
                        role_id = COALESCE($4, role_id)
       WHERE id = $5
       RETURNING id, name, email, role_id, created_at`,
      [name, email, hashedPassword, role_id, id]
    );

    res.status(200).json({
      statusCode: 200,
      message: "User updated successfully",
      user: updated.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );

    if (deleted.rowCount === 0) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }

    res
      .status(200)
      .json({ statusCode: 200, message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};
