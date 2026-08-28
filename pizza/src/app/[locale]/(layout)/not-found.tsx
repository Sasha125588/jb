import { PageFallback } from '../../_components/PageFallback/PageFallback'
import { Button } from '@/components/ui/button'
import { IntlText, Link } from '@/lib/i18n'

const NotFound = () => (
  <PageFallback
    variant="not-found"
    title={<IntlText path="page.notFound.title" />}
    description={<IntlText path="page.notFound.description" />}
    action={
      <Button
        variant="accent"
        className="h-13 w-full text-base"
        nativeButton={false}
        render={<Link href="/" />}
      >
        <IntlText path="button.viewMenu" />
      </Button>
    }
  />
)

export default NotFound
