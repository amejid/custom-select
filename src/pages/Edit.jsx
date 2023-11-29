import { useUser } from "@/context/UserContext.jsx";
import { useEffect, useState } from "react";
import { useSectors } from "@/context/SectorsContext.jsx";
import { formatSectors } from "@/util/helper.js";
import { getUser, getUserSectors, updateUser } from "@/services/apiUser.js";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { MultiSelect } from "@/components/MultiSelect.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Button, buttonVariants } from "@/components/ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast.js";

const Edit = () => {
  const { userId } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { sectors } = useSectors();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [agreementError, setAgreementError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [sectorError, setSectorError] = useState(null);

  const formattedSectors = formatSectors(sectors);

  useEffect(() => {
    if (userId === null) {
      toast({
        description: "Empty session, Please save your name first",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      const { user } = await getUser(userId);
      const { userSectors } = await getUserSectors(userId);

      if (user) {
        setName(user.name);
        setAgreed(user.agreed);
        setSelected(userSectors);
      }
    };

    fetchUser();
  }, [userId]);

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

    await updateUser({ name, agreed, selected, userId });

    toast({ description: "User info updated successfully" });
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

            {formattedSectors.length !== 0 && (
              <MultiSelect
                options={formattedSectors}
                selected={selected}
                onChange={setSelected}
                className="w-full"
              />
            )}
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
            <Button>Update</Button>
            <Link to="/" className={buttonVariants({ variant: "outline" })}>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
