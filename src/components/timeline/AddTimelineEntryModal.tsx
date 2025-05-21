
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TimelineEntryProps, TimelineEntryStatus } from "./TimelineEntry";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddTimelineEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: TimelineEntryProps) => void;
  currentImage?: string;
}

const AddTimelineEntryModal: React.FC<AddTimelineEntryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentImage,
}) => {
  const [image, setImage] = useState<string | null>(currentImage || null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<TimelineEntryStatus>("unchanged");
  const [treatmentApplied, setTreatmentApplied] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      toast({
        title: "Image Required",
        description: "Please upload an image of your plant.",
        variant: "destructive",
      });
      return;
    }

    if (!notes) {
      toast({
        title: "Notes Required",
        description: "Please add some notes about the plant's condition.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: TimelineEntryProps = {
      date: new Date(),
      image,
      notes,
      status,
      treatmentApplied: treatmentApplied || undefined,
    };

    onSave(newEntry);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setImage(currentImage || null);
    setNotes("");
    setStatus("unchanged");
    setTreatmentApplied("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Timeline Entry</DialogTitle>
          <DialogDescription>
            Record the current state of your plant and any treatments applied.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image">Plant Image</Label>
            {image ? (
              <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt="Plant"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  onClick={() => setImage(null)}
                >
                  &times;
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 w-full text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => document.getElementById("timeline-image-upload")?.click()}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                    <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG or WEBP</p>
                  </div>
                )}
              </div>
            )}
            <input
              id="timeline-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Plant Health Status</Label>
            <RadioGroup
              defaultValue="unchanged"
              value={status}
              onValueChange={(value) => setStatus(value as TimelineEntryStatus)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="improved" id="improved" />
                <Label htmlFor="improved" className="text-green-600">Improved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unchanged" id="unchanged" />
                <Label htmlFor="unchanged" className="text-yellow-600">Unchanged</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="worsened" id="worsened" />
                <Label htmlFor="worsened" className="text-red-600">Worsened</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="treatment">Treatment Applied (Optional)</Label>
            <Input
              id="treatment"
              value={treatmentApplied}
              onChange={(e) => setTreatmentApplied(e.target.value)}
              placeholder="What treatments did you apply?"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the current condition of your plant..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white" 
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Save Entry"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTimelineEntryModal;
