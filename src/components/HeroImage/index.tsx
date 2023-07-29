// Styles
import { Wrapper, Content, Text } from './HeroImage.styles';
// Types
import type { HeroImageProps } from '../../types/types';

const HeroImage: React.FC<HeroImageProps> = ({ image, title, text }) => (
  <Wrapper image={image}>
    <Content>
      <Text>
        <h1>{title}</h1>
        <p>{text}</p>
      </Text>
    </Content>
  </Wrapper>
);

export default HeroImage;
