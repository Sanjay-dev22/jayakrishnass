type Props = {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
};

export function PageHero({ index, kicker, title, lede }: Props) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="label-meta">{index}</p>
            <p className="mt-3 font-mono text-xs text-ink-muted">{kicker}</p>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
              {title}
            </h1>
            {lede && (
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {lede}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
