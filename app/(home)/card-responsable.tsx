import Image from "next/image";

type CardResponsableProps = {
  image: string;
  name: string;
  poste: string;
  contact?: string;
  lieu?: string;
};

const CardResponsable = ({
  image,
  name,
  poste,
  contact,
  lieu,
}: CardResponsableProps) => {
  return (
    <div className="w-full md:w-1/3 px-3 mb-6">
      <div className="rounded-[5px] border border-[#c3c3c3] p-3">
        <div className="w-full h-[200px] overflow-hidden">
          <Image
            src={image}
            width={200}
            height={200}
            className="w-full h-full rounded-[5px] object-contain"
            alt={name}
          />
        </div>
        <strong className="text-[18px] py-2">{name}</strong>
        <p className="">
          <strong>Poste : </strong>
          {poste}
        </p>
        {contact && (
          <p className="">
            <strong>Tél : </strong>
            {contact}
          </p>
        )}
        {lieu && (
          <p className="">
            <strong>Lieu : </strong>
            {lieu}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardResponsable;
