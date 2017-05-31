FROM rails:5

WORKDIR /app
COPY Gemfile* ./
RUN bundle install
COPY . .

EXPOSE 9292
CMD ["rails", "server", "-b", "0.0.0.0"]
