import PortfolioDisplay from "@/app/components/PortfolioDisplay";

export default async function ResumePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const res = await fetch(`http://localhost:1100/api/users/${username}`, {
    cache: "no-store",
  });
  const user = await res.json();
  const userid = user.id;

  const [
    socials,
    skills,
    projects,
    experience,
    education,
    achievements,
    custom,
  ] = await Promise.all([
    fetch(`http://localhost:1100/api/fields/socials/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`http://localhost:1100/api/fields/skills/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`http://localhost:1100/api/fields/projects/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`http://localhost:1100/api/fields/experience/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`http://localhost:1100/api/fields/education/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`http://localhost:1100/api/fields/achievements/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
    fetch(`http://localhost:1100/api/fields/custom/${userid}`, {
      cache: "no-store",
    }).then((r) => r.json()),
  ]);

  return (
    <PortfolioDisplay
      {...{
        user,
        socials,
        skills,
        projects,
        experience,
        education,
        achievements,
        custom,
      }}
    />
  );
}
