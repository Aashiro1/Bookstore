
import { SignupForm } from '../../../components/ui/signup-form';

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
   <div
  className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DCC7AA] via-[#B08968] to-[#7F5539] bg-cover bg-center"
>
  <div className="w-full max-w-md p-6 bg-[#F4E3D7]/90 backdrop-blur-md rounded-2xl shadow-lg border border-[#6D4C41]">
    <SignupForm />
  </div>
</div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src="/image.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}