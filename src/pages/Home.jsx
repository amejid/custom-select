import { useSectors } from "@/context/SectorsContext.jsx";
import { useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { MultiSelect } from "@/components/MultiSelect.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Button, buttonVariants } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { formatSectors } from "@/util/helper.js";
import { saveNewUser } from "@/services/apiUser.js";
import { useUser } from "@/context/UserContext.jsx";
import { useToast } from "@/components/ui/use-toast.js";

const Home = () => {
  const { sectors } = useSectors();
  const { toast } = useToast();
  const { setUserInfo } = useUser();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [agreementError, setAgreementError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sectorError, setSectorError] = useState(null);

  const formattedSectors = formatSectors(sectors);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setNameError(null);
    setSectorError(null);
    setAgreementError(null);

    if (name.trim() === "") {
      setNameError("Please enter your name");
      return;
    }

    if (selected.length === 0) {
      setSectorError("Please select one or more sectors");
      return;
    }

    if (!agreed) {
      setAgreementError("Please agree to the terms");
      return;
    }

    const { userId: savedUserId } = await saveNewUser({
      name,
      agreed,
      selected,
    });

    setUserInfo({ userIdFromDB: savedUserId });

    setName("");
    setSelected([]);
    setAgreed(false);

    toast({
      description: "You can edit your information by going to the edit page",
    });
  };

  return (
    <div className="flex mx-auto justify-center mt-20 max-w-xl p-8">
      <div className="flex flex-col gap-8">
        <h2>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {nameError && <p className="text-sm text-destructive">{nameError}</p>}
          <div className="flex items-center gap-2">
            <Label htmlFor="sectors">Sectors</Label>

            <MultiSelect
              options={formattedSectors}
              selected={selected}
              onChange={setSelected}
              className="w-full"
            />
          </div>
          {sectorError && (
            <p className="text-sm text-destructive">{sectorError}</p>
          )}
          <div className="flex items-center gap-2">
            <Checkbox
              id="agreement"
              checked={agreed}
              onClick={() => setAgreed((prev) => !prev)}
            />
            <Label htmlFor="agreement">Agree to terms</Label>
          </div>
          {agreementError && (
            <p className="text-sm text-destructive">{agreementError}</p>
          )}

          <div className="flex justify-between">
            <Button>Save</Button>
            <Link to="/edit" className={buttonVariants({ variant: "outline" })}>
              Edit
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
