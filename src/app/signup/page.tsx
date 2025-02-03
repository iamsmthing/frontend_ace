"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { useAuth } from "../../contexts/auth-context";
import { LoadingOverlay } from "../../components/ui/loading-overlay";
import { Camera } from "lucide-react";

const signUpSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  imageUrl: z.string().optional(),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      setFile(file);
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (file: File | null) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env
          .NEXT_PUBLIC_CLOUD_NAME!}/image/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const data = await response.json();
      const imgUrl = data.secure_url; // The uploaded image URL
      return imgUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      const profileImgUrl = await uploadProfileImage(file);
      data.imageUrl = profileImgUrl;
      console.log(data);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          toast.error("User not already exists");
          return; // Stop execution and stay on the page
        }
        throw new Error(result.error || "Failed to sign up");
      }

      const { id, username, email, token, imageUrl } = result;
      const userData = { id, username, email, token, imageUrl };

      login(userData);
      router.push("/practice");
      toast.success("Account created successfully");
    } catch (error) {
      const err: string = String(error);
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="h-[90vh]  flex items-center justify-center bg-background">
        <Card className="w-full max-w-md p-8">
          <div className="space-y-2">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Create an Account</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
                  {imagePreview ? (
                    <Label htmlFor="picture" className="cursor-pointer">
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    </Label>
                  ) : (
                    <Label
                      htmlFor="picture"
                      className="cursor-pointer text-sm text-primary hover:font-bold transition-colors"
                    >
                      <Camera className="h-8 w-8 text-zinc-400" />
                    </Label>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="picture"
                    className="cursor-pointer text-sm text-primary hover:font-bold transition-colors"
                  >
                    Upload profile picture
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
