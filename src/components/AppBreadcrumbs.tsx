// Libs
import { Link, useMatches } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

type BreadcrumbHandle = {
  breadcrumb: React.ReactNode;
};

export const AppBreadcrumbs = () => {
  const matches = useMatches() as Array<{
    pathname: string;
    handle?: BreadcrumbHandle;
  }>;

  const crumbs = matches.filter((match): match is typeof match & { handle: BreadcrumbHandle } =>
    Boolean(match.handle?.breadcrumb)
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((match, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{match.handle.breadcrumb}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={match.pathname}>{match.handle.breadcrumb}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
