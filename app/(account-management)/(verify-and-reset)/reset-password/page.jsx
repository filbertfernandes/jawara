import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ResetToken from "@/database/resetToken.model";
import dbConnect from "@/lib/mongoose";

const ResetPasswordPage = async ({ searchParams }) => {
  const q = await searchParams;

  if (q.token) {
    await dbConnect();
    const data = await ResetToken.findOne({ token: q.token });

    if (!data) {
      return (
        <>
          <div className="w-full text-center text-2xl font-bold text-gray-900 md:text-4xl">
            Invalid password reset token
          </div>
        </>
      );
    }

    return <ChangePasswordForm resetPasswordToken={q.token} />;
  } else {
    return <ResetPasswordForm />;
  }
};

export default ResetPasswordPage;
