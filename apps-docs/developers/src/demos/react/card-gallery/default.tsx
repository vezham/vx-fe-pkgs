import { CardGallery } from '@vezham/react/layouts/card-gallery'

export const Default = () => (
  <CardGallery
    aria-label="Example card gallery"
    scrollLabel="Scrollable example cards"
    className="w-full">
    <CardGallery.Group aria-label="Components">
      <CardGallery.Card
        eyebrow="Components"
        title="Your next interface starts here."
        headingAs="h3"
        description="Browse components and patterns for your application."
        action={<CardGallery.Action href="#" aria-label="Browse components" />}>
        <div
          aria-hidden="true"
          className="rounded-xl border p-4 font-mono text-sm">
          {'<CardGallery.Card />'}
        </div>
      </CardGallery.Card>
    </CardGallery.Group>
    <CardGallery.Group variant="tiles" aria-label="Resources">
      <CardGallery.Card
        variant="tile"
        eyebrow="Design"
        title="Foundations"
        headingAs="h3"
        description="Color, type, and spacing."
        action={<CardGallery.Action href="#" aria-label="Browse foundations" />}
      />
      <CardGallery.Card
        variant="tile"
        eyebrow="Guides"
        title="Start building"
        headingAs="h3"
        description="Practical recipes for common tasks."
        action={<CardGallery.Action href="#" aria-label="Browse guides" />}
      />
    </CardGallery.Group>
  </CardGallery>
)
