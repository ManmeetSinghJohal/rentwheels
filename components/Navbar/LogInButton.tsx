import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface LogInButtonProps {
  classes: string;
  onClick?: () => void;
}

const LogInButton = ({ classes, onClick }: LogInButtonProps) => {
  return (
    <div>
      <SignInButton>
        <Button className={classes} onClick={onClick}>
          Login
        </Button>
      </SignInButton>
    </div>
  );
};

export default LogInButton;
