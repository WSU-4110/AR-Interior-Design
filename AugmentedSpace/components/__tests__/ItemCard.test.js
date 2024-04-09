import renderer from 'react-test-renderer';
import ItemCard from '@/components/ItemCard';


describe("ItemCard", () => {
    it("has 1 child", () => {
        const tree = renderer.create(<ItemCard />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});