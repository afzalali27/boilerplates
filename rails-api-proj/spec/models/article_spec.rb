require 'rails_helper'

RSpec.describe Article, type: :model do
  # Validation tests
  describe 'Validations' do
    it 'is valid with valid attributes' do
      article = Article.new(title: 'Test Title', content: 'Test Content')
      expect(article).to be_valid
    end

    it 'is not valid without a title' do
      article = Article.new(content: 'Test Content')
      expect(article).not_to be_valid
    end

    it 'is not valid without content' do
      article = Article.new(title: 'Test Title')
      expect(article).not_to be_valid
    end
  end

  # Add tests for methods (if any)
  describe 'Methods' do
    it 'returns a summary of the content' do
      article = Article.new(title: 'Test Title', content: 'This is a long content')
      expect(article.summary).to eq('This is...')
    end
  end
end
