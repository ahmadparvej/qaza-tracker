import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <nav className='flex justify-between items-center'>
          <Link href="/">
            Home
          </Link>
          {/* <Link href="/add">
            Add Prayer
          </Link> */}
          <div>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
