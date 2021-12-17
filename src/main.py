import cmath
import random
import math
import pygame as pg

white = 255, 240, 200
black = 20, 20, 40

# constants
WINSIZE = [640, 480]
WINCENTER = [320, 240]
NUMSTARS = 150

WIDTH = 100000      # LY
DEPTH = 2000        # LY


#class Galaxy:
#    def __init__(self):

class Star:
    def __init__(self):
        self.r = random.random()*(WIDTH/2)
        self.theta = random.random()*(math.pi*2)
        self.x = self.r * math.cos(self.theta)
        self.y = self.r * math.sin(self.theta)
        self.z = random.random()*(DEPTH/2)
        self.color = 255, 240, 200, 1

    def draw(self, surface):
        pos = (int(self.x / WINSIZE[0]*2)+WINCENTER[0], int(self.y / WINSIZE[0]*2)++WINCENTER[1])
        surface.set_at(pos, self.color)


def draw_ellipse(surface, x, y, a, b, amgle):

    for angle in range(360):
        x1 = a * math.cos(math.radians(angle))
        y1 = b * math.sin(math.radians(angle))
        x2 = a * math.cos(math.radians(angle+1))
        y2 = b * math.sin(math.radians(angle+1))

        pg.draw.line(surface, white, (x+x1, y+y1), (x+x2, y+y2))



def main():
    random.seed()
    clock = pg.time.Clock()

    pg.init()
    pg.font.init()
    myfont = pg.font.SysFont('Courier New', 30)
    screen = pg.display.set_mode(WINSIZE)
    pg.display.set_caption("s t a r s")



    screen.fill(black)
    surface = pg.Surface(WINSIZE, pg.SRCALPHA)
    surface.fill((0, 0, 0, 0))

    count = 0
    done = 0
    while not done:
        screen.fill((0, 0, 0, 0))

        draw_ellipse(surface, WINCENTER[0], WINCENTER[1], 100, 50, 45)
        screen.blit(surface, (0, 0))

        #textsurface = myfont.render(f'Count : {count/1000000}', False, white)
        #screen.blit(surface, (0, 0))
        #screen.blit(textsurface, (0, 0))
        #batch = 100
        #for i in range(batch):
        #    s = Star()
        #    s.draw(surface)
        #    count += batch

        pg.display.update()

        for e in pg.event.get():
            if e.type == pg.QUIT or (e.type == pg.KEYUP and e.key == pg.K_ESCAPE):
                done = 1
                break
        clock.tick(50)
    pg.quit()


if __name__ == "__main__":
    main()