import LogInSignUp from "@/src/components/LogInSignUp";

const loginPage = async () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)]">
      <LogInSignUp type="login" />
    </div>
  );
};

export default loginPage;
