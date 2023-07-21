import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        wrapperClass=""
        wrapperStyle={{}}
        ariaLabel="magnifying-glass-loading"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </>
  );
};

export default Loader;
