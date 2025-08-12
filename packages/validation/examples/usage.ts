// Example usage of @workspace/validation package

import {
  createSafeParser,
  type LoginInput,
  loginSchema,
  registerSchema,
  type User,
  userSchema,
  validateOrThrow,
} from "@workspace/validation";

// Example 1: Basic validation with safeParse
const validateLogin = (data: unknown) => {
  const result = loginSchema.safeParse(data);

  if (result.success) {
    console.log("✅ Valid login data:", result.data);
    return result.data;
  }
  console.log("❌ Validation errors:", result.error.format());
  return null;
};

// Example 2: Using safe parser utility
const parseUser = createSafeParser(userSchema);

const handleUserData = (userData: unknown) => {
  const result = parseUser(userData);

  if (result.success) {
    console.log("✅ Valid user:", result.data);
    // TypeScript knows result.data is of type User
    return result.data;
  }
  console.log("❌ User validation failed:", result.error);
  return null;
};

// Example 3: Validate and throw (useful for APIs)
const createUser = (userData: unknown): User => {
  try {
    // This will throw if validation fails
    const validUser = validateOrThrow(
      userSchema,
      userData,
      "Invalid user data"
    );

    // Save to database...
    console.log("Creating user:", validUser);
    return validUser;
  } catch (error) {
    console.error("Failed to create user:", error.message);
    throw error;
  }
};

// Example 4: Using TypeScript types
const processLogin = (loginData: LoginInput) => {
  // TypeScript knows loginData has email and password properties
  console.log(`Logging in user: ${loginData.email}`);

  // Validate the data (even though TypeScript types match, runtime validation is still important)
  const result = loginSchema.safeParse(loginData);
  return result.success;
};

// Example 5: Registration with password confirmation
const handleRegistration = (data: unknown) => {
  const result = registerSchema.safeParse(data);

  if (result.success) {
    console.log("✅ Registration data valid");
    // The schema automatically validates that password === confirmPassword
    return result.data;
  }
  console.log("❌ Registration validation failed:", result.error.format());
  return null;
};

// Test the examples
console.log("=== Testing Validation Examples ===\n");

// Test 1: Valid login
validateLogin({
  email: "user@example.com",
  password: "password123",
});

// Test 2: Invalid login
validateLogin({
  email: "invalid-email",
  password: "",
});

// Test 3: Valid user data
handleUserData({
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "user@example.com",
  name: "John Doe",
  isEmailVerified: true,
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Test 4: Registration with mismatched passwords
handleRegistration({
  email: "user@example.com",
  password: "StrongPass123!",
  confirmPassword: "DifferentPass123!",
});
