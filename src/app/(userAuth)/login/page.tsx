import LogInSignUp from "@/src/components/LogInSignUp";

const loginPage = async () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <LogInSignUp type="login" />
    </div>
  );
};

export default loginPage;
