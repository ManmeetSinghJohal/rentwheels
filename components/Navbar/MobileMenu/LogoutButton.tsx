import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface LogOutButtonProps {
  classes: string;
  onClick?: () => void;
}
const LogOutButton = ({ classes, onClick }: LogOutButtonProps) => {
  return (
    <div>
      <SignOutButton>
        <Button className={classes}>Logout</Button>
      </SignOutButton>
    </div>
  );
};

export default LogOutButton;
