import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import PropTypes from 'prop-types'

/**
 * StudentProfile Component
 * 
 * A comprehensive profile display component for ESL students that shows detailed
 * information about a student's background, interests, and learning context.
 * The information is organized into collapsible sections using an accordion layout.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.student - The student data object containing all profile information
 * @param {string} [props.profileImage] - Optional URL for the student's profile image
 */
export function StudentProfile({ student, profileImage }) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header Section with Avatar and Basic Info */}
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profileImage} alt={student.name} />
          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <p className="text-muted-foreground">
            {student.english_level.charAt(0).toUpperCase() + student.english_level.slice(1)} Level Student
          </p>
        </div>
      </div>

      {/* Collapsible Sections using Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {/* Basic Information Section */}
        <AccordionItem value="basic-info">
          <AccordionTrigger>Basic Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Gender:</p>
                <p>{student.gender}</p>
              </div>
              <div>
                <p className="font-semibold">Age Range:</p>
                <p>{student.age_range}</p>
              </div>
              <div>
                <p className="font-semibold">Native Language:</p>
                <p>{student.native_language}</p>
              </div>
              <div>
                <p className="font-semibold">Other Languages:</p>
                <p>{student.other_languages.join(', ')}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Professional Background Section */}
        <AccordionItem value="professional">
          <AccordionTrigger>Professional Background</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Job Title:</p>
                <p>{student.job_title}</p>
              </div>
              <div>
                <p className="font-semibold">Industry:</p>
                <p>{student.industry}</p>
              </div>
              <div>
                <p className="font-semibold">Work Environment:</p>
                <p>{student.work_environment}</p>
              </div>
              <div>
                <p className="font-semibold">Job Description:</p>
                <p>{student.job_description}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Personal Background Section */}
        <AccordionItem value="personal">
          <AccordionTrigger>Personal Background</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Hometown:</p>
                <p>{student.hometown}</p>
              </div>
              <div>
                <p className="font-semibold">Current City:</p>
                <p>{student.current_city}</p>
              </div>
              <div>
                <p className="font-semibold">Years in Current Country:</p>
                <p>{student.years_in_current_country}</p>
              </div>
              <div>
                <p className="font-semibold">Family Status:</p>
                <p>{student.family_status}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Interests & Hobbies Section */}
        <AccordionItem value="interests">
          <AccordionTrigger>Interests & Hobbies</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Interests:</p>
                <p>{student.interests.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold">Hobbies:</p>
                <p>{student.hobbies.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold">Sports:</p>
                <p>{student.sports.join(', ')}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Learning Context Section */}
        <AccordionItem value="learning">
          <AccordionTrigger>Learning Context</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Reason for Learning:</p>
                <p>{student.reason_for_learning}</p>
              </div>
              <div>
                <p className="font-semibold">English Usage Context:</p>
                <p>{student.english_usage_context.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold">Learning Goals:</p>
                <p>{student.learning_goals.join(', ')}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Cultural Elements Section */}
        <AccordionItem value="cultural">
          <AccordionTrigger>Cultural Elements</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Favorite Foods:</p>
                <p>{student.favorite_foods.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold">Travel Experience:</p>
                <p>{student.travel_experience.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold">Cultural Interests:</p>
                <p>{student.cultural_interests.join(', ')}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Social Aspects Section */}
        <AccordionItem value="social">
          <AccordionTrigger>Social Aspects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Communication Style:</p>
                <p>{student.communication_style}</p>
              </div>
              <div>
                <p className="font-semibold">Group Work Preference:</p>
                <p>{student.group_work_preference ? 'Prefers group work' : 'Prefers individual work'}</p>
              </div>
              <div>
                <p className="font-semibold">Social Interests:</p>
                <p>{student.social_interests.join(', ')}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Edit Profile</Button>
        <Button>Contact Student</Button>
      </div>
    </div>
  )
}

// PropTypes definition for type checking and documentation
StudentProfile.propTypes = {
  student: PropTypes.shape({
    // Basic Information
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age_range: PropTypes.string.isRequired,
    native_language: PropTypes.string.isRequired,
    other_languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    english_level: PropTypes.oneOf(['beginner', 'intermediate', 'advanced']).isRequired,
    
    // Professional Information
    job_title: PropTypes.string.isRequired,
    job_description: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
    years_of_experience: PropTypes.number.isRequired,
    work_environment: PropTypes.oneOf(['remote', 'office', 'hybrid', 'other']).isRequired,
    
    // Personal Information
    hometown: PropTypes.string.isRequired,
    current_city: PropTypes.string.isRequired,
    years_in_current_country: PropTypes.number.isRequired,
    family_status: PropTypes.string.isRequired,
    living_situation: PropTypes.string.isRequired,
    
    // Interests and Activities
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    hobbies: PropTypes.arrayOf(PropTypes.string).isRequired,
    favorite_activities: PropTypes.arrayOf(PropTypes.string).isRequired,
    sports: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    // Learning Context
    reason_for_learning: PropTypes.string.isRequired,
    english_usage_context: PropTypes.arrayOf(PropTypes.string).isRequired,
    learning_goals: PropTypes.arrayOf(PropTypes.string).isRequired,
    preferred_learning_style: PropTypes.arrayOf(PropTypes.string).isRequired,
    
    // Cultural and Social Aspects
    favorite_foods: PropTypes.arrayOf(PropTypes.string).isRequired,
    travel_experience: PropTypes.arrayOf(PropTypes.string).isRequired,
    cultural_interests: PropTypes.arrayOf(PropTypes.string).isRequired,
    music_preferences: PropTypes.arrayOf(PropTypes.string).isRequired,
    communication_style: PropTypes.string.isRequired,
    group_work_preference: PropTypes.bool.isRequired,
    social_interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  profileImage: PropTypes.string,
} 