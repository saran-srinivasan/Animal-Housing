import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allStudiesState, selectedStudiesState } from "@/store/store";
import { useRecoilValue, useSetRecoilState } from "recoil";

type Animal = "Rabbit" | "Rat";

type AnimalCardProps = {
  animal: Animal;
  availableCount: number;
  onSelect: (animal: Animal) => void;
};

export function AnimalCard({ animal, onSelect }: AnimalCardProps) {
  const studies = useRecoilValue(allStudiesState);
  const setSelectedStudies = useSetRecoilState(selectedStudiesState);
  const handleSelectAnimal = () => {
    onSelect(animal);
    const filtered = studies.filter((study) => study.species === animal);
    setSelectedStudies(filtered);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{animal}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => handleSelectAnimal()}>View Details</Button>
      </CardContent>
    </Card>
  );
}

type AnimalCardsProps = {
  animals: { animal: Animal; availableCount: number }[];
  onSelectAnimal: (animal: Animal) => void;
};

export function AnimalCards({ animals, onSelectAnimal }: AnimalCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {animals.map((animalData) => (
        <AnimalCard
          key={animalData.animal}
          animal={animalData.animal}
          availableCount={animalData.availableCount}
          onSelect={onSelectAnimal}
        />
      ))}
    </div>
  );
}
