import { useMemo, useState } from "react";
import { projectGallery, type GalleryCategory } from "../content/site";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Reveal } from "../components/ui/Reveal";
import { Lightbox } from "../components/ui/Lightbox";
import "../styles/gallery-page.css";

type Filter = "All" | GalleryCategory;

export function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "All" ? projectGallery.items : projectGallery.items.filter((item) => item.category === filter)),
    [filter],
  );
  const filters: Filter[] = ["All", ...projectGallery.categories];

  return (
    <>
      <Header solid />
      <main className="gallery-page">
        <div className="container">
          <a href="/" className="caption gallery-page__back">
            ← {projectGallery.back}
          </a>

          <div className="gallery-page__head">
            <Reveal>
              <p className="label">{projectGallery.label}</p>
              <h1 className="display display--xl gallery-page__title">
                Cascade in <em>Detail</em>
              </h1>
            </Reveal>
            <Reveal delay={110}>
              <p className="body-text gallery-page__intro">{projectGallery.intro}</p>
            </Reveal>
          </div>

          <div className="gallery-page__filters" role="tablist" aria-label="Filter images">
            {filters.map((name) => {
              const count =
                name === "All"
                  ? projectGallery.items.length
                  : projectGallery.items.filter((item) => item.category === name).length;
              return (
                <button
                  key={name}
                  role="tab"
                  aria-selected={filter === name}
                  className={`gallery-page__filter ${filter === name ? "is-active" : ""}`}
                  onClick={() => setFilter(name)}
                >
                  {name}
                  <span className="gallery-page__filter-count">{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <div className="gallery-page__grid" key={filter}>
            {items.map((item, i) => (
              <button
                key={item.src}
                className={`gallery-page__item ${item.category === "Plans" ? "is-plan" : ""}`}
                onClick={() => setOpenIndex(i)}
                aria-label={`Open ${item.caption}`}
              >
                <img src={item.src} alt={item.caption} loading="lazy" decoding="async" />
                <span className="gallery-page__meta">
                  <span className="caption">{item.caption}</span>
                  <span className="caption gallery-page__category">{item.category}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <Lightbox items={items} index={openIndex} onChange={setOpenIndex} />
    </>
  );
}
