export default function SkeletonCard() {
  return (
    <article className="product-card skeleton-card">
      <div className="product-image-wrapper skeleton-block" />
      <div className="product-body">
        <div className="skeleton-line skeleton-line-lg" />
        <div className="skeleton-line skeleton-line-sm" />
        <div className="skeleton-line skeleton-line-md" />
        <div className="skeleton-button" />
      </div>
    </article>
  );
}
