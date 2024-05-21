import { Container } from "../Container";
import { Tags } from "./Tags/Tags";
import { Logo } from "./Logo";
import { Searchbar } from "./Searchbar";
import { UserMenu } from "./UserMenu";

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-3 border-b-2">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div className="w-1/4">
              <Logo />
            </div>
            <Searchbar />
            <div className="w-1/4">
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
      <Tags />
    </div>
  );
};
