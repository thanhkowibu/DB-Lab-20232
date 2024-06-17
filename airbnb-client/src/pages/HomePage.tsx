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
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdXNlfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhvdXNlfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    src: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdXNlfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvb2x8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1670076513880-f58e3c377903?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnVybml0dXJlfGVufDB8fDB8fHww",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 11,
    src: "https://plus.unsplash.com/premium_photo-1678402545077-7a9ec2b5e5b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1544727219-d2ff78f0f148?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FyZGVufGVufDB8fDB8fHww",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1571192776145-9f563c1df686?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2FyZGVufGVufDB8fDB8fHww",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYWNofGVufDB8fDB8fHww",
  },
  {
    id: 16,
    src: "https://plus.unsplash.com/premium_photo-1686090448422-de8536066f64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FiaW58ZW58MHx8MHx8fDA%3D",
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
