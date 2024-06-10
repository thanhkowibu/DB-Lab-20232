import authApi from "@/api/modules/auth.api";
import { useAuth } from "@/context/useAuth";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [code, setCode] = useState(403);
  const navigate = useNavigate();

  const { logoutUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authApi.validate();
        setCode(res.code);
      } catch (err: any) {
        setCode(err.code);
        if (err.code === 403) logoutUser();
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    if (code === 403) {
      navigate("/auth", { state: { isToggled: true } });
    } else {
      navigate("/properties");
    }
  };

  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-rose-500 font-medium">
          Discover Your Next Trip on
        </span>
        <h3 className="text-4xl md:text-7xl font-bold">Mikabnb</h3>
        <p className="text-base md:text-lg text-neutral-600 text-justify my-4 md:my-6 mr-6">
          A short-term rental platform for travel enthusiasts. Whether you're
          looking for a cozy apartment, a beachfront villa, or an urban loft,
          Mikabnb has you covered.
        </p>
        <button
          onClick={handleClick}
          className="bg-rose-500 text-white text-lg font-medium py-3 px-6 rounded-lg transition-all hover:bg-rose-600 active:scale-95"
        >
          Book a trip now
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: any) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "http://localhost:9000/airbnb-media/82286a55-a42f-4ba0-a7d5-f02c24361318.jpg",
  },
  {
    id: 2,
    src: "http://localhost:9000/airbnb-media/3f2c024e-fec7-4174-90fe-da845763e20f.jpg",
  },
  {
    id: 3,
    src: "http://localhost:9000/airbnb-media/48480027-86a3-484e-9aab-2c5959a55066.jpg",
  },
  {
    id: 4,
    src: "http://localhost:9000/airbnb-media/777d9717-9307-4ab9-b281-56dc9c8f0dbb.jpg",
  },
  {
    id: 5,
    src: "http://localhost:9000/airbnb-media/08a9a187-3cd9-4d55-9870-74c4effcba1d.jpg",
  },
  {
    id: 6,
    src: "http://localhost:9000/airbnb-media/ac314a0f-2abd-48ae-9e39-1f74e7101ec2.jpg",
  },
  {
    id: 7,
    src: "http://localhost:9000/airbnb-media/bdf95a30-e790-46e0-8583-0d73452d8086.jpg",
  },
  {
    id: 8,
    src: "http://localhost:9000/airbnb-media/342b5678-14e0-4483-8aaf-cb89c930f61c.jpg",
  },
  {
    id: 9,
    src: "http://localhost:9000/airbnb-media/50eacca5-d297-4540-b537-2f3e88fa196e.jpg",
  },
  {
    id: 10,
    src: "http://localhost:9000/airbnb-media/b4334ff3-f013-45ca-9712-89bd43b6d423.jpg",
  },
  {
    id: 11,
    src: "http://localhost:9000/airbnb-media/82068c75-d8aa-4c95-9ee5-5f46ec70f9fd.jpg",
  },
  {
    id: 12,
    src: "http://localhost:9000/airbnb-media/f4be7cb7-4ff1-4ad9-968e-518a131940a6.jpg",
  },
  {
    id: 13,
    src: "http://localhost:9000/airbnb-media/c7916334-7501-4982-8255-1870360fdd90.jpg",
  },
  {
    id: 14,
    src: "http://localhost:9000/airbnb-media/57d1c2d8-5a9d-4313-beff-cc2a392968a9.jpg",
  },
  {
    id: 15,
    src: "http://localhost:9000/airbnb-media/9929110b-5033-4a43-ab1d-70ef663548ac.jpg",
  },
  {
    id: 16,
    src: "http://localhost:9000/airbnb-media/b7db8a1a-2073-4f31-b203-b015b00d0ca0.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq: any) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq: any) => sq)}
    </div>
  );
};
