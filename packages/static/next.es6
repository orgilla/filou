import { setLink, setHistory } from '@filou/static/settings';
import Link from 'next/link';

const DocumentLink = ({ className, to, children, onClick, ...rest }) => {
  let as;
  if (to.indexOf('/code/') === 0) {
    as = to;
    to = '/code';
  }

  return (
    <Link href={to} as={as} prefetch key={as}>
      <a className={className} key={as}>
        {children}
      </a>
    </Link>
  );
};
setLink(DocumentLink);
setHistory(props => props.children({ pathname: '/' }));
