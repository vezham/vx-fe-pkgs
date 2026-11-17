import { Table } from '@vezham/react-v3'

const iconProps = [
  {
    name: 'size',
    type: 'number | string',
    default: '24',
    description: 'Icon width and height. Numeric values use pixels.'
  },
  {
    name: 'color',
    type: 'string',
    default: 'currentColor',
    description: 'Primary icon color. Accepts a CSS color value.'
  },
  {
    name: 'weight',
    type: '"outline" | "filled" | "duotone-outline" | "duotone-filled"',
    default: 'outline',
    description: 'Icon style. Available weights depend on the selected icon.'
  },
  {
    name: 'strokeWidth?',
    type: 'number | string',
    default: '—',
    description: 'Overrides the stroke width on stroked icon paths.'
  },
  {
    name: 'secondaryColor?',
    type: 'string',
    default: 'same as color',
    description: 'Secondary color for duotone icon layers.'
  },
  {
    name: 'className?',
    type: 'string',
    default: '—',
    description: 'Additional CSS classes applied to the SVG element.'
  },
  {
    name: 'ref?',
    type: 'Ref<SVGSVGElement>',
    default: '—',
    description: 'React ref forwarded to the SVG element.'
  }
]
const imageProps = [
  {
    name: 'src',
    type: 'string',
    default: 'asset URL',
    description: 'SVG URL for the selected logo variant or illustration.'
  },
  {
    name: 'alt',
    type: 'string',
    default: 'asset title',
    description:
      'Accessible image description. Use an empty string for decorative images.'
  },
  {
    name: 'width',
    type: 'number | string',
    default: 'intrinsic width',
    description: 'Displayed image width in pixels.'
  },
  {
    name: 'height',
    type: 'number | string',
    default: 'intrinsic height',
    description: 'Displayed image height in pixels.'
  },
  {
    name: 'className?',
    type: 'string',
    default: '—',
    description: 'Additional CSS classes on the image. Use class in HTML.'
  }
]

export const AssetPropsReference = ({ icons }: { icons: boolean }) => (
  <section className="min-w-0 space-y-3" aria-label="Props reference">
    <h2 className="text-xl font-semibold">Props</h2>
    <p className="text-muted text-sm">
      {icons
        ? 'React component props. The CDN element uses icon, secondary-color, stroke-width, and class attributes.'
        : 'Image props for the HTML and React embed examples.'}
    </p>
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label={icons ? 'Icon component props' : 'Image props'}>
          <Table.Header>
            <Table.Column isRowHeader>Prop</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column>Default</Table.Column>
            <Table.Column>Description</Table.Column>
          </Table.Header>
          <Table.Body>
            {(icons ? iconProps : imageProps).map(prop => (
              <Table.Row key={prop.name}>
                <Table.Cell>
                  <code>{prop.name}</code>
                </Table.Cell>
                <Table.Cell>
                  <code className="whitespace-normal">{prop.type}</code>
                </Table.Cell>
                <Table.Cell>
                  <code>{prop.default}</code>
                </Table.Cell>
                <Table.Cell>{prop.description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  </section>
)
