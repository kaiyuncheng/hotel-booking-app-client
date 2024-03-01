import TitleRoomInfo from '@/components/elements/TitleRoomInfo';
import type { IRoom } from '@/types/room';
import RoomInfoList from '@/components/elements/RoomInfoList';

type Props = {
  result: IRoom;
};

const RoomInfoBody = ({ result }: Props) => {
  return (
    <>
      <h3 className="text-3xl font-bold mb-2">{result.name}</h3>
      <p className="font-semibold mb-5 md:mb-12">{result.description}</p>
      <RoomInfoList result={result} />
      <div className="mb-5 md:mb-12">
        <TitleRoomInfo>訂房須知</TitleRoomInfo>
        <ul className="text-sm font-medium list-decimal list-inside leading-relaxed">
          <li>入住時間為下午3點，退房時間為上午12點。</li>
          <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
          <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
          <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
          <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
          <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
          <li>我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
          <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
          <li>我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
          <li>為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
        </ul>
      </div>
    </>
  );
};

export default RoomInfoBody;
