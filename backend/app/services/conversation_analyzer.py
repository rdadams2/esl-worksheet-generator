"""Natural language processing service for analyzing student conversations.

This module provides functionality to analyze conversation transcripts and extract
relevant information about students using spaCy for NLP tasks. It can identify
personal information, preferences, and various attributes from natural language text.
"""

import spacy
from typing import Dict, List, Any
import re

class ConversationAnalyzer:
    """Service class for analyzing conversation transcripts using NLP.
    
    This class uses spaCy for natural language processing to extract structured
    information from conversation transcripts. It can identify various attributes
    like personal information, interests, and preferences through pattern matching
    and entity recognition.
    
    Attributes:
        nlp (spacy.Language): Loaded spaCy language model
        patterns (Dict[str, str]): Regular expression patterns for extracting specific information
        categories (Dict[str, List[str]]): Keywords associated with different information categories
    """
    
    def __init__(self):
        """Initialize the ConversationAnalyzer with spaCy model and patterns."""
        # Load English language model
        self.nlp = spacy.load("en_core_web_lg")
        
        # Define entity patterns for specific information
        self.patterns = {
            "age_range": r"\b(?:\d{1,2}(?:-\d{1,2})?)\s*(?:years? old|yo)\b",
            "years_experience": r"\b(\d+)\s*years?\s*(?:of)?\s*experience\b",
            "years_in_country": r"\b(\d+(?:\.\d+)?)\s*years?\s*(?:in|living in)\b",
        }
        
        # Keywords for different categories
        self.categories = {
            "hobbies": ["hobby", "hobbies", "enjoy", "like to", "free time", "pastime"],
            "sports": ["sport", "exercise", "workout", "training", "play", "game"],
            "interests": ["interested in", "passion", "love", "enjoy"],
            "learning_goals": ["goal", "want to", "improve", "better at", "learn"],
            "work_environment": ["office", "remote", "hybrid", "workplace", "work from home"],
        }

    def analyze_transcription(self, transcription: str) -> Dict[str, Any]:
        """Analyze conversation transcription and extract relevant information.
        
        Args:
            transcription (str): The text transcription of the conversation
            
        Returns:
            Dict[str, Any]: Dictionary containing extracted information with keys
                corresponding to student attributes and their extracted values
        """
        doc = self.nlp(transcription)
        
        # Initialize the result dictionary
        result = {
            "name": self._extract_name(doc),
            "age_range": self._extract_pattern(transcription, "age_range"),
            "native_language": self._extract_language(doc),
            "english_level": self._extract_english_level(doc),
            "job_title": self._extract_job_title(doc),
            "years_of_experience": self._extract_pattern(transcription, "years_experience"),
            "years_in_current_country": self._extract_pattern(transcription, "years_in_country"),
            "hometown": self._extract_location(doc, "hometown"),
            "current_city": self._extract_location(doc, "current_city"),
            "hobbies": self._extract_category(doc, "hobbies"),
            "sports": self._extract_category(doc, "sports"),
            "interests": self._extract_category(doc, "interests"),
            "learning_goals": self._extract_category(doc, "learning_goals"),
            "work_environment": self._extract_category(doc, "work_environment"),
        }
        
        return {k: v for k, v in result.items() if v is not None}

    def _extract_name(self, doc: spacy.tokens.Doc) -> str:
        """Extract person name from the conversation.
        
        Args:
            doc (spacy.tokens.Doc): spaCy document object
            
        Returns:
            str: Extracted full name or None if not found
        """
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                # Verify it's likely a full name (first and last)
                if len(ent.text.split()) >= 2:
                    return ent.text
        return None

    def _extract_pattern(self, text: str, pattern_key: str) -> str:
        """Extract information based on regex patterns.
        
        Args:
            text (str): Text to search in
            pattern_key (str): Key for the pattern to use from self.patterns
            
        Returns:
            str: Matched text or None if no match found
        """
        match = re.search(self.patterns[pattern_key], text, re.IGNORECASE)
        if match:
            return match.group(0)
        return None

    def _extract_language(self, doc: spacy.tokens.Doc) -> str:
        """Extract native language information from the conversation.
        
        Args:
            doc (spacy.tokens.Doc): spaCy document object
            
        Returns:
            str: Extracted language name or None if not found
        """
        language_indicators = ["native language", "mother tongue", "first language"]
        for sent in doc.sents:
            for indicator in language_indicators:
                if indicator in sent.text.lower():
                    # Look for language names in the sentence
                    for ent in sent.ents:
                        if ent.label_ == "LANGUAGE":
                            return ent.text
        return None

    def _extract_english_level(self, doc: spacy.tokens.Doc) -> str:
        """Extract English proficiency level from the conversation.
        
        Args:
            doc (spacy.tokens.Doc): spaCy document object
            
        Returns:
            str: Extracted proficiency level or None if not found
        """
        levels = ["beginner", "intermediate", "advanced", "fluent"]
        level_indicators = ["level", "proficiency", "english"]
        
        for sent in doc.sents:
            sent_lower = sent.text.lower()
            if any(indicator in sent_lower for indicator in level_indicators):
                for level in levels:
                    if level in sent_lower:
                        return level
        return None

    def _extract_job_title(self, doc: spacy.tokens.Doc) -> str:
        """Extract job title information from the conversation.
        
        Args:
            doc (spacy.tokens.Doc): spaCy document object
            
        Returns:
            str: Extracted job title or None if not found
        """
        job_indicators = ["work as", "job is", "position is", "profession is"]
        for sent in doc.sents:
            for indicator in job_indicators:
                if indicator in sent.text.lower():
                    # Look for the next noun chunk after the indicator
                    start_idx = sent.text.lower().find(indicator) + len(indicator)
                    remaining_text = sent.text[start_idx:].strip()
                    remaining_doc = self.nlp(remaining_text)
                    for chunk in remaining_doc.noun_chunks:
                        return chunk.text
        return None

    def _extract_location(self, doc: spacy.tokens.Doc, location_type: str) -> str:
        """Extract location information based on type from the conversation.
        
        Args:
            doc (spacy.tokens.Doc): spaCy document object
            location_type (str): Type of location to extract ('hometown' or 'current_city')
            
        Returns:
            str: Extracted location name or None if not found
        """
        location_indicators = {
            "hometown": ["from", "grew up in", "born in"],
            "current_city": ["live in", "living in", "moved to", "currently in"]
        }
        
        for sent in doc.sents:
            if any(indicator in sent.text.lower() for indicator in location_indicators[location_type]):
                for ent in sent.ents:
                    if ent.label_ in ["GPE", "LOC"]:
                        return ent.text
        return None

    def _extract_category(self, doc: spacy.tokens.Doc, category: str) -> List[str]:
        """Extract information for a specific category from the conversation.
        
        Args:
            doc (spacy.tokens.Doc): spaCy document object
            category (str): Category to extract (e.g., 'hobbies', 'sports')
            
        Returns:
            List[str]: List of extracted items for the category or None if none found
        """
        results = []
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in self.categories[category]):
                # Extract noun chunks that follow category keywords
                for chunk in sent.noun_chunks:
                    if not any(keyword in chunk.text.lower() for keyword in self.categories[category]):
                        results.append(chunk.text.strip())
        return list(set(results)) if results else None 