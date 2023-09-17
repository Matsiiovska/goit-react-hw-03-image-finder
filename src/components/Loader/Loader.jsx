import React from "react";
import { Dot,  LoaderContainer} from './Loader.styled';

const Loader = () => {
    return (
 <LoaderContainer>
      <Dot />
      <Dot />
      <Dot />
    </LoaderContainer>
  );    
};

export default Loader;