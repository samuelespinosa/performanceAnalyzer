import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react"
import { toast } from "sonner";

interface SearchBarProps {
    isLoading: boolean | null,
    setUrl: (newUrl: string) => void
}

export default function SearchBar({ setUrl, isLoading }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isValidUrl, setIsValidUrl] = useState(true);

    const validateUrl = (url: string): boolean => {
        try {
            // Basic URL validation
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (!urlPattern.test(url)) return false;
            
            // More thorough validation
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    };

    const searchHandler = () => {
        const value = inputRef.current?.value?.trim();
        if (!value) {
            toast.error("Please enter a valid URL (e.g., hhtps://example.com)");
            return;
        }

        const isValid = validateUrl(value);
        setIsValidUrl(isValid);

        if (isValid) {
            // Ensure URL has protocol
            const formattedUrl = value.startsWith('http') ? value : `https://${value}`;
            setUrl(formattedUrl);
        } else {
            toast.error("Please enter a valid URL (e.g., hhtps://example.com)");
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-2 mb-4">
            <Input
                type="url"
                placeholder="Enter a web page URL (e.g., example.com)"
                className={`rounded-sm border py-5 ${!isValidUrl ? 'border-red-500' : 'border-gray-300'}`}
                ref={inputRef}
                onKeyDown={(e) => e.key === "Enter" && searchHandler()}
            />
            <Button
                disabled={!!isLoading}
                className="py-5 w-full md:w-30"
                onClick={searchHandler}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin mr-2" />
                        Please wait
                    </>
                ) : 'Analyze'}
            </Button>
        </div>
    )
}