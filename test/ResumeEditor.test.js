import { render, screen, fireEvent } from '@testing-library/react';
import ResumeEditor from '../components/resume/ResumeEditor';

describe('ResumeEditor', () => {
  const mockSetResumeData = jest.fn();
  const mockResumeData = { content: 'Initial resume text' };
  const mockOnOptimize = jest.fn();

  test('renders correctly with initial content', () => {
    render(<ResumeEditor resumeData={mockResumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const textarea = screen.getByLabelText(/Resume Editor/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Initial resume text');
    expect(screen.getByText(/Edit Your Resume/i)).toBeInTheDocument();
    expect(screen.getByText(/Optimize with AI/i)).toBeInTheDocument();
  });

  test('updates resume content on textarea change', () => {
    render(<ResumeEditor resumeData={mockResumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const textarea = screen.getByLabelText(/Resume Editor/i);
    fireEvent.change(textarea, { target: { value: 'Updated resume text' } });
    expect(mockSetResumeData).toHaveBeenCalledWith({ content: 'Updated resume text' });
  });

  test('calls onOptimize when Optimize button is clicked', () => {
    render(<ResumeEditor resumeData={mockResumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const optimizeButton = screen.getByText(/Optimize with AI/i);
    fireEvent.click(optimizeButton);
    expect(mockOnOptimize).toHaveBeenCalled();
  });

  test('has proper accessibility attributes', () => {
    render(<ResumeEditor resumeData={mockResumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const textarea = screen.getByLabelText(/Resume Editor/i);
    const optimizeButton = screen.getByText(/Optimize with AI/i);
    expect(textarea).toHaveAttribute('aria-label', 'Resume Editor');
    expect(optimizeButton).toHaveAttribute('aria-label', 'Optimize Resume with AI');
    expect(textarea).toHaveAttribute('required');
  });

  test('applies correct styling and animations', () => {
    const { container } = render(<ResumeEditor resumeData={mockResumeData} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    expect(container.querySelector('textarea')).toHaveClass('rounded-xl', 'focus:ring-2', 'focus:ring-blue-500');
    expect(container.querySelector('button')).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-green-500');
  });

  test('displays placeholder text when resume content is empty', () => {
    render(<ResumeEditor resumeData={{ content: '' }} setResumeData={mockSetResumeData} onOptimize={mockOnOptimize} />);
    const textarea = screen.getByLabelText(/Resume Editor/i);
    expect(textarea).toHaveAttribute('placeholder', 'Paste or edit your resume here—AI will optimize it for ATS...');
  });
});
