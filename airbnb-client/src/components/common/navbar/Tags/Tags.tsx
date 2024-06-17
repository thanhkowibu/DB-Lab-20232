import { TagItem } from "./TagItem";
import { Container } from "../../Container";

import { useLocation, useSearchParams } from "react-router-dom";
import { tagsArray } from "@/data/tagsArray";

export const Tags = () => {
  const [params] = useSearchParams();
  const tag = params?.get("tag");
  const { pathname } = useLocation();

  const isMainPage = pathname === "/properties";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-2 flex items-center justify-between overflow-x-auto">
        {tagsArray.map((item) => (
          <TagItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            value={item.value}
            desc={item.desc}
            selected={tag === item.value}
          />
        ))}
      </div>
    </Container>
  );
};
