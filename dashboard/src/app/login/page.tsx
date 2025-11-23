// app/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema, type UserLoginInput } from "@/lib/validation/user";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading, data, error, isError }] = useLoginMutation();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: UserLoginInput) => {
    setGeneralError(null);
    try {
      const res = await login(values).unwrap();
      // res has { success, statusCode, message, user }
      console.log("Login success:", res);
      // router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      const msg =
        err?.data?.message ||
        err?.error ||
        "Login failed. Please check your credentials.";
      setGeneralError(msg);
    }
  };

  const disabled = isLoading || isSubmitting;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4 border rounded-lg p-6 bg-card">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-lg mb-6 bg-card"
          noValidate
        >
          <h1 className="text-2xl font-bold mb-2">Sign in</h1>

          {generalError && (
            <p className="text-sm text-red-500">{generalError}</p>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full p-3 rounded border"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full p-3 rounded border"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="w-full p-3 mt-3 rounded bg-primary text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {disabled ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          {isError && (
            <p className="text-red-500">
              Error: {JSON.stringify((error as any)?.data || error)}
            </p>
          )}
          {data && (
            <pre className="mt-2 text-xs bg-black/5 p-2 rounded overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </main>
  );
}
