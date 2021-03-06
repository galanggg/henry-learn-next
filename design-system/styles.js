import { mode } from '@chakra-ui/theme-tools';
import { shadow } from '@chakra-ui/core';

const styles = {
  global: (props) => ({
    body: {
      fontFamily: 'body',
      color: mode('gray.700', 'whiteAlpha.900')(props),
      bg: mode('palletWhite', 'white')(props),
      lineHeight: 'normal',
      minHeight: 'full'
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props),
      fontSize: 'sm'
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      boxSizing: 'border-box',
      wordWrap: 'break-word'
    },
    // remove focus chakra
    '*:focus': {
      boxShadow: 'unset!important',
      outline: 'none!important'
    },
    fontFeatureSettings: `'kern'`,
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased'
  })
};

export default styles;
