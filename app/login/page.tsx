"use client";

import { useState } from "react";
import { signIn, signUp } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { Box, VStack, Input, Button, Heading, Text, HStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp.email({
          email,
          password,
          name,
        });
        router.push("/");
      } else {
        await signIn.email({
          email,
          password,
        });
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "github" | "google") => {
    setError("");
    setLoading(true);

    try {
      if (provider === "github") {
        await signIn.social({ provider: "github" });
      } else {
        await signIn.social({ provider: "google" });
      }
    } catch (err: any) {
      setError(err?.message || "OAuth sign in failed");
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Box maxW="md" w="full" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <VStack gap={6} align="stretch">
          <Heading size="xl" textAlign="center">
            {isSignUp ? "Sign Up" : "Sign In"} to AgNerd
          </Heading>

          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <VStack gap={4} align="stretch">
              {isSignUp && (
                <Field label="Name">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required={isSignUp}
                  />
                </Field>
              )}

              <Field label="Email">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </Field>

              <Field label="Password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Field>

              <Button type="submit" colorScheme="teal" w="full" disabled={loading}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </VStack>
          </form>

          <HStack gap={2} w="full">
            <Box flex={1} h="1px" bg="gray.300" />
            <Text fontSize="sm" color="gray.500">
              OR
            </Text>
            <Box flex={1} h="1px" bg="gray.300" />
          </HStack>

          <VStack gap={2} w="full">
            <Button
              w="full"
              variant="outline"
              onClick={() => handleOAuthSignIn("github")}
              disabled={loading}
            >
              Continue with GitHub
            </Button>
            <Button
              w="full"
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              disabled={loading}
            >
              Continue with Google
            </Button>
          </VStack>

          <Text textAlign="center" fontSize="sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="ghost"
              colorScheme="teal"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
