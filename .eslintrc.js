module.exports = {
  extends: "airbnb-base",
  rules: {
    "no-underscore-dangle": ["error", { "allow": ["_", "_id"] }],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": ["error", { allow: ["log", "warn", "error"] }]
  }
};
