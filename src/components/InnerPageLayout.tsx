type InnerPageLayoutProps = {
  children: React.ReactNode;
  hero?: React.ReactNode;
};

/** Gray page background + 1200px white content card (GeneratePress separate-containers). */
export default function InnerPageLayout({ children, hero }: InnerPageLayoutProps) {
  return (
    <div className="flex-1 bg-[#f7f8f9] pb-10">
      {hero}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <article className="bg-white px-6 py-8 sm:px-10 sm:py-10">{children}</article>
      </div>
    </div>
  );
}
