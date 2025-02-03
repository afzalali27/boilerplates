require 'rails_helper'

RSpec.describe ArticlesController, type: :controller do
  let(:valid_attributes) {
    { title: 'Test Title', content: 'Test content for the article' }
  }

  let(:invalid_attributes) {
    { title: nil, content: nil }
  }

  # Create an article before running tests
  let(:article) { Article.create!(valid_attributes) }

  # Test for Index action
  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
      expect(response.status).to eq(200)
    end

    it 'assigns all articles to @articles' do
      article = Article.create!(valid_attributes)
      get :index
      expect(assigns(:articles)).to eq([article])
    end
  end

  # Test for Show action
  describe 'GET #show' do
    it 'returns a successful response' do
      get :show, params: { id: article.id }
      expect(response).to be_successful
      expect(response.status).to eq(200)
    end
  end

  # Test for Create action
  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new article' do
        expect {
          post :create, params: { article: valid_attributes }
        }.to change(Article, :count).by(1)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new article' do
        expect {
          post :create, params: { article: invalid_attributes }
        }.not_to change(Article, :count)
      end
    end
  end

  # Test for Update action
  describe 'PATCH #update' do
    context 'with valid parameters' do
      it 'updates the article' do
        patch :update, params: { id: article.id, article: { title: 'Updated Title' } }
        article.reload
        expect(article.title).to eq('Updated Title')
      end
    end

    context 'with invalid parameters' do
      it 'does not update the article' do
        patch :update, params: { id: article.id, article: invalid_attributes }
        article.reload
        expect(article.title).not_to eq(nil)
      end
    end
  end

  # Test for Destroy action
  describe 'DELETE #destroy' do
    it 'destroys the requested article' do
      article = Article.create!(valid_attributes)
      expect {
        delete :destroy, params: { id: article.id }
      }.to change(Article, :count).by(-1)
    end
  end
end
