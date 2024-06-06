import Image from "next/image";

export default function CardPreview({ card }) {
  return (
    card?.image && (
      <Image src={card?.image} width={200} height={200} alt="card" />
    )
  );
}
