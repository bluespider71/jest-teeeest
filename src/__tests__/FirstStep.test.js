import renderer from 'react-test-renderer';
import FirstStep from '../components/firstStep/firstStep'
it('renders correctly', () => {
    const tree = renderer
      .create(<FirstStep page="https://Facebook.com">Facebook</FirstStep>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});