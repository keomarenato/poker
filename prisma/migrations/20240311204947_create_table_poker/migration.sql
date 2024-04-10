-- CreateTable
CREATE TABLE "PokerMove" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "s1" INTEGER NOT NULL,
    "s2" INTEGER NOT NULL,
    "s3" INTEGER NOT NULL,
    "totalRepasse" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PokerMove_pkey" PRIMARY KEY ("id")
);
