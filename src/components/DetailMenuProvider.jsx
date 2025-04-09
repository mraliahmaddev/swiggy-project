import DetailMenu from "./DetailMenu";

function DetailMenuProvide({ itemCards ,menuData }) {

    
    return (
        <div className="my-5">
            {itemCards.map(({ card: { info } }) => (
                <DetailMenu key={info.id} info={info} menuData={menuData} />
            ))}
        </div>
    );
  }

  export default DetailMenuProvide