/**
 * Fixed, purely decorative backdrop: a soft radial mesh with three blurred
 * gradient orbs drifting behind every page, so the glass panels have something
 * gentle to refract. Sizes are clamp()-based so they scale down on narrow
 * screens instead of swallowing the viewport.
 */
export default function BackgroundMesh() {
  return (
    <div className="bg-mesh" aria-hidden="true">
      <span className="-left-32 -top-40 h-[clamp(16rem,70vw,38rem)] w-[clamp(16rem,70vw,38rem)] animate-float bg-teal" />
      <span className="right-[-8rem] top-1/3 h-[clamp(14rem,55vw,30rem)] w-[clamp(14rem,55vw,30rem)] animate-floatSlow bg-teal-soft" />
      <span className="bottom-[-6rem] left-1/4 h-[clamp(12rem,48vw,26rem)] w-[clamp(12rem,48vw,26rem)] animate-float bg-teal" />
    </div>
  );
}
