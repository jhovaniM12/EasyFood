"use client";

import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
}

export default function SearchBar({ placeholder = "Buscar...", onSearch }: SearchBarProps) {
    return (
        <div className="px-4 py-3 bg-[#FDF4ED]">
            <Paper elevation={0} sx={{ display: "flex", alignItems: "center", backgroundColor: "#ffffffff", borderRadius: "12px", px: 1.5, py: 0.5 }}>
                <InputBase
                    placeholder={placeholder}
                    fullWidth
                    onChange={(e) => onSearch?.(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search size={18} color="#9CA3AF" />
                        </InputAdornment>
                    }
                    sx={{ fontSize: "0.875rem", color: "#424242ff", "& ::placeholder": { color: "#9CA3AF", opacity: 1 } }}
                />
            </Paper>
        </div>
    );
}
