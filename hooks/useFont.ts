import { Poppins } from 'next/font/google';

const font = Poppins({
	subsets: ['latin'],
	weight: ['600']
});

const useFont = () => {
  return {font}
}

export default useFont;