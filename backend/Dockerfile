FROM ruby:3.2.2

ARG RUBYGEMS_VERSION=3.4.6

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /api

WORKDIR /api

COPY Gemfile /api/Gemfile

COPY Gemfile.lock /api/Gemfile.lock

RUN gem update --system ${RUBYGEMS_VERSION} && \
    bundle install

COPY . /api
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

CMD ["rails", "server", "-b", "0.0.0.0"]

# Add a script to be executed every time the container starts.
VOLUME /api/tmp
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000